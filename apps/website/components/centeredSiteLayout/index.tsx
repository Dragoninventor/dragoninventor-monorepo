import { CardPage } from "@dragoninventor/ui";
import SiteHeader from "@/components/siteHeader";
import SiteFooter from "@/components/siteFooter";
import { ReactNode } from "react";
import DummyHeader from "@/components/siteHeader/dummyHeader";

const CenteredLayout = ({ children }: { children: ReactNode }) => {
	return (
		<CardPage>
			<div className={"flex w-full flex-1 justify-center"}>
				<SiteHeader />
				<div
					className={
						"-order-1 flex h-full w-full flex-col items-center"
					}
				>
					{children}
					<SiteFooter />
				</div>
				<DummyHeader />
			</div>
		</CardPage>
	);
};

export default CenteredLayout;
