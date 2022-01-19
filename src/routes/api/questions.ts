import { prisma } from "$lib/prisma";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
  const questions = await prisma.question.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return {
    status: 200,
    body: questions,
  };
};

export const post: RequestHandler<unknown, FormData> = async ({
  body,
  headers,
}) => {
  const shouldReturnJson = headers.accept === "application/json";
  const text = body.get("text");

  if (!text.trim()) {
    if (shouldReturnJson) {
      return {
        status: 400,
        body: {
          error: "Please enter a question",
        },
      };
    }
    return {
      status: 302,
      headers: {
        Location: `/?error=${encodeURIComponent("Please enter a question")}`,
      },
    };
  }

  const question = await prisma.question.create({
    data: {
      text: text.trim(),
    },
  });

  if (shouldReturnJson) {
    return {
      status: 200,
      body: {
        question,
        success: "Question added",
      },
    };
  }

  return {
    status: 302,
    headers: {
      Location: `/?success=${encodeURIComponent("Question added")}`,
    },
  };
};

export const del: RequestHandler<unknown, FormData> = async ({
  body,
  headers,
}) => {
  const shouldReturnJson = headers.accept === "application/json";
  const id = body.get("id");

  if (!id) {
    if (shouldReturnJson) {
      return {
        status: 400,
        body: {
          error: "Missing id",
        },
      };
    }
    return {
      status: 302,
      headers: {
        Location: `/?error=${encodeURIComponent("Missing id")}`,
      },
    };
  }

  await prisma.question.delete({
    where: { id },
  });

  if (shouldReturnJson) {
    return {
      status: 200,
      body: { success: "Question deleted" },
    };
  }

  return {
    status: 302,
    headers: {
      Location: `/?success=${encodeURIComponent("Question deleted")}`,
    },
  };
};
