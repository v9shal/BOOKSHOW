import { prisma } from '../src/db';

async function main(){
    const all=await prisma.user.findMany();
      console.log('All users:', JSON.stringify(all, null, 2))
}
main()
.then(async () => {
    await prisma.$disconnect()
}  )
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    })
