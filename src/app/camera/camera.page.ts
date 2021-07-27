import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  imgSrc: any;
  constructor() { }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetHeight: 500,
      targetWidth: 500,
      saveToPhotoAlbum: false
    };

    Camera.getPicture(options).then((imageData) => {
      this.imgSrc = imageData;
     });

  }

}
