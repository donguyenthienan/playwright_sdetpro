import {test} from '@playwright/test';
import ComputerDetailsPage from "../../models/pages/ComputerDetailsPage";
import CheapComputerComponent from "../../models/components/computer/CheapComputerComponent";
import StandardComputerComponent from "../../models/components/computer/StandardComputerComponent";
import ComputerEssentialComponent from "../../models/components/computer/ComputerEssentialComponent";

test('Test Generic Component in Page', async ({page}) => {
    const computerDetailsPage: ComputerDetailsPage = new ComputerDetailsPage(page);
    const cheapComputerComp: ComputerEssentialComponent = computerDetailsPage.computerComp(CheapComputerComponent);
    const standardComputerComp: ComputerEssentialComponent = computerDetailsPage.computerComp(StandardComputerComponent);

    await cheapComputerComp.selectProcessorType("dadfdasf");
    await standardComputerComp.selectProcessorType("dadfdasf");
})