import { PlayHqService } from "../../playhq-service/playhq"
import { writeGameData } from "../utils";


const extractGameDataFromPlayHq = async () => {
    const playhqService = new PlayHqService();
    const result = await playhqService.getTeamFixture();
    writeGameData(result);
}

void extractGameDataFromPlayHq();
