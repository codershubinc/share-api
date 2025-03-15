import { BucketModule } from "./bucket/bucket.module";
import { DBModule } from "./db/db.module";

const appwriteModules = [

    BucketModule,
    DBModule
]

export default appwriteModules;