import React, { useState, useCallback } from 'react';
import { firebaseApp } from '../../../firebase';
import Resizer from 'react-image-file-resizer';
import {base64StringToBlob}  from 'blob-util';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import getCroppedImg from './crop-image';
import './styles.css';




const FileUpload = ({ doImageUrl, fileType, onShowImageUpload }) => {

    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState('');
    const [filename, setFilename] = useState('');
    const [filetype, setFiletype] = useState('');

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const goBack = () => {
      onShowImageUpload(false);
    }

    const showCroppedImage = useCallback(async () => {
        
        try {
          const croppedImage = await getCroppedImg(
            image,
            croppedAreaPixels
          )
          
          let cropped = croppedImage.slice(23);
          const blob = base64StringToBlob(cropped, filetype);

          const storageRef = firebaseApp.storage().ref(`/${fileType}/${filename}`);
          const task = storageRef.put(blob);

          task.then(snapshot => {
                return snapshot.ref.getDownloadURL()
                }).then(downUrl => {
                    setImageUrl(downUrl);
                    doImageUrl(downUrl);
                    onShowImageUpload(false);
                    console.log('downUrl', downUrl)
                })
          
        } catch (e) {
          console.error(e)
        }
      }, [croppedAreaPixels])

    const onUpload = async event => {

        let fileInput = false
        if(event.target.files && event.target.files[0]) {
            fileInput = true
        }
    
        if(fileInput) {
    
          const file = event.target.files[0];

          setFilename(file.name)
          setFiletype(file.type)
    
          let _type;
    
          if(file.type === 'image/jpeg') {
            _type = 'JPEG';
          }else if(file.type === 'image/png') {
            _type = 'PNG';
          }
          
          const resizeFile = (file) => new Promise(resolve => {
            Resizer.imageFileResizer(file, 800, 800, _type, 100, 0,
            uri => {
              resolve(uri);
            },
            'base64'
            );
          });
    
          const _image = await resizeFile(file);
          let b64Data;
          if(file.type === 'image/jpeg') {
            b64Data = _image.slice(23);
          }else if(file.type === 'image/png') {
            b64Data = _image.slice(22);
          }
   
          setTimeout(function(){ 
            setImage(_image);
          }, 100);   
        }
      }


    return (
        <>  
            <button className="btn-back" onClick={goBack}>&#8826;</button> 
            <input className="input-class-upload-image" type="file" onChange={onUpload} /> 
            <div className="crop-container">
                <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                showGrid={false}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                />
            </div>

            <div className="controls">
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(zoom)}
                />   
                              
            </div>
            <button className="btn-image-upload" onClick={showCroppedImage}>Done</button> 
        </>
    );
}

export default FileUpload;