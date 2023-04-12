"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_zod_1 = require("nestjs-zod");
const app_module_1 = require("./app.module");
async function bootstrap() {
    var _a, _b;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, nestjs_zod_1.patchNestJsSwagger)();
    const config = new swagger_1.DocumentBuilder()
        .setTitle((_a = process.env.API_NAME) !== null && _a !== void 0 ? _a : "Test")
        .setVersion((_b = process.env.API_VERSION) !== null && _b !== void 0 ? _b : "Test")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map