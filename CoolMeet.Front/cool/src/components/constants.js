//export const BASE_URL = "http://coolmeetweb.azurewebsites.net/api";
export const BASE_URL = "http://localhost:59102/api";

export const DEFAULT_EVENT = {
    id: 0,
    description: "",
    startDate: "",
    endDate: "",
    country: "",
    city: "",
    address: "",
    status: {
        id: 0,
        description: "",
    },
    users: [],
    tags : []
}

export const EVENT_STATUS = {
    Available : "Dostępny",
    Unavailable : "Niedostępny"
}