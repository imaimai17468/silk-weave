import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ChannelSchema } from "@/types";

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    prisma.$connect();
  } catch (error) {
    return Error(`DB接続失敗しました: ${error}`);
  }
};

export const GET = async () => {
  try {
    await connect();
    const channels = await prisma.channel.findMany();

    const parsedChannels = ChannelSchema.array().safeParse(channels);

    if (!parsedChannels.success) {
      return NextResponse.json(
        { messeage: `Error: ${parsedChannels.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { channels: parsedChannels.data },
      { status: 200 }
    );
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
    const channel = await prisma.channel.create({
      data: { name },
    });

    const parsedChannel = ChannelSchema.safeParse(channel);

    if (!parsedChannel.success) {
      return NextResponse.json(
        { messeage: `Error: ${parsedChannel.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ channel: parsedChannel.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ messeage: `Error: ${error}` }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
