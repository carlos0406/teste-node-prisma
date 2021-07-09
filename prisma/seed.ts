import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function seeding() {
  const user = await prisma.user.upsert({
    where: { username: 'userseed' },
    update: {},
    create: {
      username: 'userseed',
      password_hash: 'senha'
    }
  })
  await prisma.post.upsert({
    where: {
      slug: 'slug1'
    },
    update: {},
    create: {
      title: 'title 1',
      slug: 'slug1',
      content: '<p>content 1</p>',
      createdBy: user.id
    }
  })
  await prisma.post.upsert({
    where: {
      slug: 'slug2'
    },
    update: {},
    create: {
      title: 'title 2',
      slug: 'slug2',
      content: '<p>content 2</p>',
      createdBy: user.id
    }
  })
  await prisma.post.upsert({
    where: {
      slug: 'slug3'
    },
    update: {},
    create: {
      title: 'title 3',
      slug: 'slug3',
      content: '<p>content 3</p>',
      createdBy: user.id
    }
  })
}

seeding()
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
