"use client";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";

export default function Home() {
  const images = [
    { src: "/slide/1.webp", link: "/kulce-altin" },
    { src: "/slide/2.webp", link: "/ziynet" },
    { src: "/slide/3.webp", link: "/kulce-altin" },
    { src: "/slide/4.webp", link: "/kulce-altin" },
    { src: "/slide/5.webp", link: "/ziynet" },
  ];
  const items = [
    { src: "/images/kulce10gr.webp", title: "Gram Külçe Altın", link: "/kulce-altin" },
    { src: "/images/ceyrek.webp", title: "Ziynet Altın", link: "/ziynet" },
    { src: "/images/hesaba.jpg", title: "Hesaba Altın Havale", link: "/altin-havale" },
    { src: "/images/kulce5gr.webp", title: "Hesaptan Fiziki Altına", link: "/fiziki-altin" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 3 saniyede bir değiştir

    return () => clearInterval(interval); // Temizlik için interval'i temizle
  }, [images.length]);

  return (
    <div>
      <Link href={images[currentIndex].link}>
        <Image
          src={images[currentIndex].src}
          alt={`Slide ${currentIndex + 1}`}
          width={800}
          height={600}
        />
      </Link>
      <h2 className="text-center text-blue-900 text-3xl p-6">En çok yapılan işlemler</h2>
      <ul className="p-4">
        {items.map((item, index) => (
          <Link href={item.link} key={index}>
            <li style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '10px',
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              <Image 
                src={item.src} 
                alt={item.title} 
                width={70}
                height={70}
                style={{ 
                  marginRight: '10px',
                  borderRadius: '8px' 
                }} 
              />
              <span className="text-blue-900">{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
