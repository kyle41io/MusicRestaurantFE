import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import storage from "@/lib/firebaseConfig";

export default function useUpload(file) {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: 'image/jpeg'
        })    
        uploadTask.on('state_changed', undefined, (error) => {
            reject(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
                resolve(URL)
            })
        })
    })
}