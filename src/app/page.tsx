import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/16/solid'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  SlackIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import { type ArticleWithSlug, getAllArtikkel } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { metadata as globalMetadata } from './layout'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Card as="article">
      <Card.Title href={`/artikkel/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Lest artikkel</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Community() {
  const slackUrl = `${globalMetadata.other?.joinSlackUrl || '#'}`

  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <ChatBubbleLeftRightIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Bli med på diskusjonen!</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Offentlig PaaS har Norges største nettverk av plattformentusiaster samlet i en Slack-kanal!
      </p>

      <Button href={slackUrl} variant="primary" className="group mt-6 w-full">
        Bli med i Slack
        <SlackIcon className="h-4 w-4 fill-white" />
      </Button>
    </form>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  const slackUrl = `${globalMetadata.other?.joinSlackUrl || '#'}`
  const githubUrl = `${globalMetadata.other?.githubOrgUrl || '#'}`
  const youtubeUrl = `${globalMetadata.other?.youtubeUrl || '#'}`

  let artikkel = (await getAllArtikkel()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {globalMetadata.applicationName}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {globalMetadata.description}
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href={githubUrl}
              aria-label="Følg oss på GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={slackUrl}
              aria-label="Bli med på diskusjonen i Slack"
              icon={SlackIcon}
            />
            <SocialLink
              href={youtubeUrl}
              aria-label="Følg oss på YouTube"
              icon={YouTubeIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {artikkel.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Community />
          </div>
        </div>
      </Container>
    </>
  )
}
