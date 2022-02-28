declare let AWS: any;
declare const DEMO_TABLE: string | undefined;
declare const documentClient: any;
declare const saveDataToTable: (insertData: any) => Promise<boolean>;
