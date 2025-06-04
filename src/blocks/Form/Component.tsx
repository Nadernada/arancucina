'use client'
import type {
  FormFieldBlock as BaseFormFieldBlock,
  Form as FormType,
} from '@payloadcms/plugin-form-builder/types'

type FormFieldBlock = BaseFormFieldBlock & {
  width?: number
}

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import Link from 'next/link'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType & {
    fields: FormFieldBlock[]
  }
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText
          className="mb-8 lg:mb-12 text-center font-bodoni"
          data={introContent}
          enableGutter={false}
        />
      )}
      <div className="p-4 lg:p-6 flex flex-col md:flex-row gap-8 justify-center items-start">
        <div className="mb-8 lg:mb-12 bg-gray-200 w-full md:w-fit p-6 !h-[fit-content] gap-6 flex flex-col">
          <h2 className="text-2xl font-bold font-bodoni">ARAN World</h2>
          <p className="text-gray-600">
            RABAT-Agdal, 457, <br /> Avenue Hassan II,
            <br /> Résidence Mariam, Magasin n° 11
          </p>
          <p className="text-gray-600">
            phone: +39 085 87941
            <br />
            fax: +39 085 8794315
          </p>
          <div className="flex flex-row gap-3 justify-between items-center">
            {Socials?.map(({ link, url }, i) => {
              return (
                <Link href={link?.url || ''} key={i}>
                  <Image src={url || ''} width={24} height={24} alt="" className="" />
                </Link>
              )
            })}
          </div>

          <Link
            href="https://arancucine.whistlelink.com/"
            className="bg-black text-white px-6 py-3 rounded-full text-center"
          >
            Whistleblowing
          </Link>
        </div>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)} className="!max-w-[35rem]">
              <div className="mb-4 last:mb-0 grid grid-cols-2 gap-4">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div
                          className={cn('mb-1 last:mb-0', {
                            'col-span-1': (formFromProps.fields?.[index]?.width ?? 100) < 50,
                            'col-span-2': (formFromProps.fields?.[index]?.width ?? 100) >= 50,
                          })}
                          key={index}
                        >
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}

const Socials = [
  {
    link: {
      type: 'custom',
      url: 'https://www.instagram.com',
      label: 'instagram',
    },
    url: '/api/media/file/download%20(1).svg',
    thumbnailURL: null,
  },

  {
    link: {
      type: 'custom',
      url: 'https://www.instagram.com',
      label: 'instagram',
    },
    url: '/api/media/file/download%20(3).svg',
    thumbnailURL: null,
  },
  {
    link: {
      type: 'custom',
      url: 'https://www.instagram.com',
      label: 'instagram',
    },
    url: '/api/media/file/download%20(4).svg',
    thumbnailURL: null,
  },

  {
    link: {
      type: 'custom',
      url: 'https://www.instagram.com',
      label: 'instagram',
    },
    url: '/api/media/file/download%20(5).svg',
    thumbnailURL: null,
  },

  {
    link: {
      type: 'custom',
      url: 'https://www.instagram.com',
      label: 'instagram',
    },
    url: '/api/media/file/download.svg',
    thumbnailURL: null,
  },

  {
    link: {
      type: 'custom',
      url: 'https://www.instagram.com',
      label: 'instagram',
    },

    url: '/api/media/file/download%20(1).svg',
    thumbnailURL: null,
  },
]
