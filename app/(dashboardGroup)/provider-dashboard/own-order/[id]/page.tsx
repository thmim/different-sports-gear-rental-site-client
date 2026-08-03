import { providerOwnRentalDetailsAction } from "@/app/(dashboardGroup)/_actions/getProviderOwnRental";
import OrderDetailsPage from "@/app/(dashboardGroup)/_components/providerRentalDetails";

export default async function ProviderOwnOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
      const rentalDetails = await providerOwnRentalDetailsAction(id)
    return (
      <div>
          <OrderDetailsPage order={rentalDetails.data}/>
      </div>
    );
}