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
    <div className="fixed bottom-4 right-4">
      <div className="dropdown dropdown-top dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1">
          Feedback
        </div>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow translate-x-14"
        >
          <form action={postQuestion} className="p-4 flex flex-col">
            <label className="label flex flex-col items-start gap-1 w-full">
              Name
              <input name="name" className="input input-bordered" />
            </label>
            <label className="label flex flex-col items-start gap-1 w-full">
              Feedback
              <textarea
                name="question"
                className="textarea textarea-bordered w-full"
              />
            </label>
            <button type="submit" className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
