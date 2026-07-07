'use client'
import {PickerOverlay} from 'filestack-react'
import { useState } from 'react';
export default function FileStack() {
  const [showPiker, setShowPicker] = useState(false)
  return (
    <main className="h-full flex flex-col pt-25 items-center">
      <h1 className="text-4xl font-bold mb-2">
        Turn your photos into polaroids
      </h1>

      <p className="text-xl mb-8">
        Simply upload your photo and get a
        <br />
        cool polaroid in return!
      </p>
      {
        showPiker && (
          <PickerOverlay 
          apikey={process.env.FILESTACK_API_KEY}
          onUploadDone={(file)=>{
            console.log('file, ', file)
            setShowPicker(false)
          }}
          

         
          />
        )
      }

      <button
        className="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-4
          rounded
        "
        onClick={()=>{
          setShowPicker(true)
        }}
      >
        Upload file
      </button>

      <section className="flex gap-x-7.5 mt-20">
        <div>
          <h2>Uploaded image</h2>
        </div>

        <div>
          <h2>Transformed image</h2>
        </div>
      </section>
    </main>
  );
}