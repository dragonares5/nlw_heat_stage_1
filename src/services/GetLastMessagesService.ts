import prismaClient from "../prisma";

class GetLastMessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({
      // Take equivale a "LIMIT" do SQL server.
      take: 3,
      orderBy: {
        created_at: "desc"
      },
      include: {
        user: true
      }
    })

    return messages;
  }
}

export default GetLastMessagesService;
