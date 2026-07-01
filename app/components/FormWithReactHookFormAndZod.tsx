'use client'
import { useState } from "react";
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, SignUpSchema } from "../lib/type";



export default function FormWithReactHookFormAndZod() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues, 
    setError,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema)
  })

  async function onSubmit(data: SignUpSchema) {

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        ...data, 
        confirmPassword: 2233444555
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const responseData = await response.json()



    if(!response.ok){
      const errors = responseData.errors
      if(errors.email){
        setError('email', {
          type: 'server',
          message: errors.email
        })
      }else if(errors.password){
        setError('password', {
          type: 'server',
          message: errors.password
        })
      }else if(errors.confirmPassword){
        setError('confirmPassword', {
          type: 'server',
          message: errors.confirmPassword
        })
      }
      return
    }
    reset()
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">


      <input
        {...register('email')}
        type="email"
        placeholder="Email"

        className="px-4 py-2 rounded"
      />
      {
        errors?.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )
      }

      <input
        {...register('password')}
        type="password"
        placeholder="Password"

        className="px-4 py-2 rounded"
      />
      {
        errors?.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )
      }

      <input
        {...register('confirmPassword')}
        type="password"
        placeholder="Confirm password"

        className="px-4 py-2 rounded"
      />
      {
        errors?.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
        )
      }

      <button

        disabled={isSubmitting}
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}