
const establishSocketConnection = (io) =>{
    

        io.on('connection', (socket) => {
            

            socket.on("Name Socket", (data) =>{
                socket.join(data)
            })


            socket.on("Hire Notification To Guide", (data) =>{
                socket.broadcast.to(data.guideId).emit("Hire Notification To Guide", data)
            })


            socket.on("Hire Notification To Tourist", (data) =>{
                socket.broadcast.to(data.touristId).emit("Hire Notification To Tourist", data)
            })

        })

}



module.exports = establishSocketConnection