export interface OffboardRequestBody {
  address: {
    streetLine1: string;
    country: string;
    postalCode: string;
    receiver: string;
  };
  notes: string | null;
  phone: string;
  email: string;
}
