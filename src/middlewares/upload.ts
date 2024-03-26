import multer from "multer";

const storage = multer.diskStorage({});
const uploads = multer({
  storage: storage,
});

export default uploads;