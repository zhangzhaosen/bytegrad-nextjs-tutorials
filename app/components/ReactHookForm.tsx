'use client'
import React, { useEffect, useState } from "react"
import { Control, useFieldArray, useForm, useFormState, useWatch } from "react-hook-form"


type FormInputs = {
  firstName: string
  lastName: string
}
export default function ReactHookForm() {
  const { register, subscribe } = useForm<FormInputs>()

  useEffect(() => {
    // make sure to unsubscribe;
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values)
      },
    })

    return () => callback()

    // You can also just return the subscribe
    // return subscribe();
  }, [subscribe])

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
    </form>
  )
}