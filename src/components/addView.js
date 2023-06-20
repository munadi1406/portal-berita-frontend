import { postView } from "../api/view";

const addView = async (id) => {
  try {
    const artikelId = id;
    const date = new Date().toISOString();
    await postView(artikelId, date);
  } catch (error) {
    console.log(error);
  }
};

export default addView;
