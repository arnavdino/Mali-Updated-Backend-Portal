"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EventsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const helpers_service_1 = require("../helpers/helpers.service");
const event_service_1 = require("./event.service");
let EventsController = EventsController_1 = class EventsController {
    constructor(helperService, eventService) {
        this.helperService = helperService;
        this.eventService = eventService;
        this.logger = new common_1.Logger(EventsController_1.name);
    }
    async addEventV2(req, res, payload) {
        this.eventService.addEvent({
            userId: req.user.id,
            name: payload.name,
            data: payload.data,
        });
        return this.helperService.formatResponse(this.logger, this.empty(), res, `adding event ${payload.name} from user ${req.user.id} with data ${payload.data}`);
    }
    async empty() {
        return 'done';
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Response)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "addEventV2", null);
EventsController = EventsController_1 = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [helpers_service_1.HelpersService,
        event_service_1.EventService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map