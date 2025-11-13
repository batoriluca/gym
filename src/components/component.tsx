import React from 'react'
import inputError from '@/styles/createaccount.module.css'
import Image from 'next/image'

interface InputErrorProps {
  error: boolean | undefined | string;
  touched?: boolean | undefined | string;
}

export const InputError: React.FC<InputErrorProps> = ({ error, touched }) => {
  return (
    <div>
      {error || touched ? (
        <p className={inputError.from_error}>
          {error}
        </p>
      ) : null}
    </div>
  );
};
interface ImageComponentProps {
  src: boolean | undefined | string;
  alt?: boolean | undefined | string;
  value?: boolean | undefined | string;
  className?: undefined | string;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ src, width = 120, height = 120, alt = "Image", className, value }) => {
  return (
    value ? (
      <Image src={`${src}`} alt={`${alt}`} priority width={width} height={height} className={className} />
    ) : (
      <Image src={`/artist_img/osky1.jpg`} alt={`${alt}`} priority width={width} height={height} className={className} />
    )
  );
};
