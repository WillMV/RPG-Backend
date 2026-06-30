export default function presenceRegistry({
  io,
  socket,
}: {
  io: any;
  socket: any;
}) {
  socket.on("coords", (coords: any) => {
    socket.emit("coords", coords);
  });
}
