import Image from 'next/image';
import styles from "../styles/anasayfa.module.css";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useOnScreen } from "../utils/hooks";
import {createClient} from '@supabase/supabase-js';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export async function getStaticProps(){
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

    const {data} = await supabaseAdmin
      .from('images')
      .select("*")
      .order("id");

  return {
    props:{
      images:data
    },
  }
}

function cn(...classes: string[]){
  return classes.filter(Boolean).join(' ');
}

type Image = {
   id:number,
   href:string,
   imageSrc:string,
   number:number
}

export default function Gallery({ images }: {images: Image[] }){
  const [[page, direction], setPage] = useState([0, 0]);
  const [counter, setCounter] = useState(0);
  const [ref, visible] = useOnScreen({ rootMargin: "-100px" });

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCounter(counter + 1);
      paginate(counter);
    }, 8000);
    return () => {
      clearTimeout(timeout);
    };
  }, [counter]);
  return (
    <>
    <Head>
    <title>Anasayfa</title>
    </Head>
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:-px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
         {
          images.map((image)=>(
            <BlurImage key={image.id} image={image} />
          ))
         }
      </div>
    </div>
    </>
    
  )
}

function BlurImage({image}:{image: Image}){
  const [isLoading,setLoading] = useState(true);
  return(
    <a href="#" className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image 
        alt="" 
        src={image.imageSrc}
        fill
        style={{objectFit:'cover'}}
        className={
          cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
            ? 'grayscale blur-2xl scale-110'
            : 'grayscale-0 blur-0 scale-100'
          )
        }
        onLoadingComplete={()=>setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.number}</h3>
    </a>
  )
}