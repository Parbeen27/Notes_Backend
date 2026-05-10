const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const Authroute = require("./routes/auth.routes")
const NoteRoute = require("./routes/notes.route")
const UserRoute = require("./routes/user.routes")
const AdminRoute = require("./routes/admin.routes")
const errormiddleware = require("./middleware/error.middleware")
const app = express()
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend.vercel.app"
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",Authroute)
app.use("/api/notes",NoteRoute)
app.use("/api/user",UserRoute)
app.use("/api/admin",AdminRoute)

app.use(errormiddleware)
module.exports  = app