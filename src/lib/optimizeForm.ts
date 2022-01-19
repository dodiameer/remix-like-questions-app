export type FormCallback = (params: {
  response: Response;
  form: HTMLFormElement;
}) => void | Promise<void>;

export const optimizeForm = (node: HTMLFormElement, callback: FormCallback) => {
  const submitHandler = async (e: Event) => {
    e.preventDefault();
    const formData = new FormData(node);
    const response = await fetch(node.action, {
      method: node.method,
      body: node.method !== "GET" ? formData : undefined,
      headers: {
        Accept: "application/json",
      },
    });
    callback({ response, form: node });
  };

  node.addEventListener("submit", submitHandler);
  return {
    destroy: () => node.removeEventListener("submit", submitHandler),
  };
};
