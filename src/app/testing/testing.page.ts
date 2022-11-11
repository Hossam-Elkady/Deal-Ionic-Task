import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { GestureController } from '@ionic/angular';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';

@Component({
    selector: 'app-testing',
    templateUrl: './testing.page.html',
    styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit, AfterViewInit {

    isRecording: boolean = false;
    storedFileNames: any[] = []
    durationToDisplay: string = ''
    durationRecord: number = 0
    @ViewChild('recordButton', { read: ElementRef }) recordButton: ElementRef

    constructor(private gestureCtrl: GestureController) { }

    ngAfterViewInit(): void {
        const longPress = this.gestureCtrl.create({
            el: this.recordButton.nativeElement,
            threshold: 0,
            gestureName: 'long-press',
            onStart: ev => {
                Haptics.impact({ style: ImpactStyle.Heavy });
                this.startRecording()
                this.calculateDuration();
            },
            onEnd: ev => {
                Haptics.impact({ style: ImpactStyle.Heavy });
                this.stopRecording()
            },
        }, true)
        longPress.enable()
    }

    calculateDuration() {
        if (!this.isRecording) {
            this.durationRecord = 0
            this.durationToDisplay = ''
            return;
        }
        this.durationRecord += 1;
        const minutes = Math.floor(this.durationRecord / 60)
        const seconds = (this.durationRecord % 60).toString().padStart(2, '0')
        this.durationToDisplay = `${minutes}:${seconds}`
        setTimeout(() => this.calculateDuration(), 1000)
    }

    ngOnInit() {
        this.loadFiles()
        VoiceRecorder.requestAudioRecordingPermission()
    }

    async loadFiles() {
        Filesystem.readdir({
            path: '',
            directory: Directory.Data
        }).then(result => {
            console.log(result);
            this.storedFileNames = result.files
        })

    }

    startRecording() {
        if (this.isRecording) return
        this.isRecording = true;
        VoiceRecorder.startRecording()
    }

    stopRecording() {
        if (!this.isRecording) return
        VoiceRecorder.stopRecording().then(async (record: RecordingData) => {
            this.isRecording = false;
            if (record.value && record.value.recordDataBase64) {
                const recordBase64 = record.value.recordDataBase64;
                const fileName = new Date().getTime() + '.wav';
                await Filesystem.writeFile({
                    path: fileName,
                    directory: Directory.Data,
                    data: recordBase64
                })
                this.loadFiles()
            }
        })
    }

    async playRecord(record: any) {
        const audioFile = await Filesystem.readFile({
            path: record.name,
            directory: Directory.Data
        })
        const recordBase64 = audioFile.data;
        const audioRef = new Audio(`data:audio/wav;base64,${recordBase64}`)
        audioRef.oncanplaythrough = () => audioRef.play()
        audioRef.load()
    }

    async deleteRecord(record: any) {
        await Filesystem.deleteFile({
            directory: Directory.Data,
            path: record.name
        })
        this.loadFiles()
    }

}
