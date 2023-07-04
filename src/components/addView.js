import { postView } from "../api/view";

const addView = async (id) => {
  try {
    const artikelId = id;
    const date = new Date().toISOString();
    await postView(artikelId, date);
  } catch (error) {
   
  }
};

export default addView;
