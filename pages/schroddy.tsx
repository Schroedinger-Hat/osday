import Hero from '../components/Hero';
import { useTranslations } from 'next-intl';
import ThreeScene from '../components/ThreeScene';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      metas: {
        title: 'Schroddy, Open Source Day 2024 - Florence',
        description:
          'Open Source Day 2024 coming on the 7-8 of March 2024. Stay tuned on our social'
      },
      messages: (await import(`../public/locales/${locale}.json`)).default
    }
  };
}

export default function Schroddy() {
  const t = useTranslations('Schroddy');
  const [windowState, setWindowState] = useState({ innerWidth: 1600, innerHeight: 900 });

  useEffect(() => {
    if (window) {
      // @ts-ignore
      setWindowState(window);
    }
  }, []);

  return (
    <>
      <div className="container">
        <Hero
          title={t('title')}
          subtitle={t('subtitle')}
          description={t('description')}
          originals={false}
        />
        <div style={{ width: '100vw', height: '100vh' }}>
          <Canvas flat linear style={{ backgroundColor: "transparent" }}>
            <Suspense fallback={'loading'}>
              <PerspectiveCamera
                makeDefault
                fov={60}
                aspect={windowState.innerWidth / windowState.innerHeight}
                position={[3, 0.15, 1]}
                near={10}
                far={10000}
                position-z={1050}
              ></PerspectiveCamera>
              <ThreeScene />
              <directionalLight color={0xeb4634} position={[1, 0.75, 0.5]} />
              <directionalLight color={0xccccff} position={[-1, 0.75, -0.5]} />
              <directionalLight color={0xeb4634} position={[-5, -5, -1]} />
              <directionalLight color={0xccccff} position={[50, 50, 1]} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}
