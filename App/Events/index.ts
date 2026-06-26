import { IRegistry } from "../utils";
import presenceRegistry from "./presenceEvent";

const registry = ({ io, socket, prisma }: IRegistry) => {
  presenceRegistry({ io, socket });
};

export default registry;
