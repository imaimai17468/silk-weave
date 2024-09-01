import { connect } from "@/lib/connect";
import { ChannelSchema } from "@/types/zod";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    await connect();
    const channels = await prisma.channel.findMany();

    const parsedChannels = ChannelSchema.array().safeParse(channels);

    if (!parsedChannels.success) {
      return NextResponse.json({ messeage: `Parsing Error: ${parsedChannels.error}` }, { status: 400 });
    }

    return NextResponse.json({ channels: parsedChannels.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ messeage: `Error: ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request) => {
  try {
    await connect();
    const { name } = await req.json();

    const nameValidation = ChannelSchema.pick({ name }).safeParse({ name });

    if (!nameValidation.success) {
      return NextResponse.json({ message: `Validation Error: ${nameValidation.error}` }, { status: 400 });
    }

    const channel = await prisma.channel.create({
      data: { name: nameValidation.data.name },
    });

    return NextResponse.json({ channel }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ messeage: `Error: ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
