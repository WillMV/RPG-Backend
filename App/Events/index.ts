import { IRegistry } from "../utils/interfaces";
import presenceRegistry from "./presenceEvent";

const registry = ({ io, socket }: IRegistry) => {
  presenceRegistry({ io, socket });
};

export default registry;
