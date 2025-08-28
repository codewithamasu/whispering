import { app } from "./server.ts";
import { setupSwagger } from "./config/swagger.ts";
import config from "./config/config.ts";
import connectDB from "./config/connectToDb.ts";
const { PORT} = config;

// Setup Swagger
setupSwagger(app)

async function start() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Running in http://localhost:${PORT}`)
      console.log(`📄 Swagger docs available at http://localhost:${PORT}/api-docs`);
    })
  } catch (error) {
    console.error(error)
  }
}

start()
