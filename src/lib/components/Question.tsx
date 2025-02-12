import { jetstream } from "@nats-io/jetstream";
import { connect } from "../nats/connect";

export function Question() {
  const postQuestion = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const question = formData.get("question");

    const nc = await connect();

    const js = jetstream(nc);
    await js.publish("question", JSON.stringify({ name, question }));

    await nc.close();
  };

  return (
    <div className="dropdown dropdown-top dropdown-left">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-primary btn-outline m-1"
      >
        Spørsmål
      </div>
      <div
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-fit p-2 shadow translate-x-14"
      >
        <form action={postQuestion} className="p-4 flex flex-col">
          <label className="label flex flex-col items-start gap-1 w-full">
            Navn
            <input name="name" className="input input-bordered" />
          </label>
          <label className="label flex flex-col items-start gap-1 w-full">
            Spørsmål
            <textarea
              name="question"
              className="textarea textarea-bordered w-full"
            />
          </label>
          <button type="submit" className="btn btn-primary mt-4">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
