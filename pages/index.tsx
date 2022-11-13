import Main from '../components/Main'

export async function getStaticProps() {
  return {
    props: {
      metas: {
        title: 'Open Source Day 2023 - Florence',
        description: 'Open Source Day 2023 coming soon on March 2023. Stay tuned on our social'
      }
    }
  }
}

export default function Home() {
  return (
    <>
      <Main />
    </>
  )
}
