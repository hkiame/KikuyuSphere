import { Request } from "express";
import User from "../src/models/user";

interface CustomRequest extends Request {
  user: User;
}

export default CustomRequest;
