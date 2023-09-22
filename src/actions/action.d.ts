export type ServerActionsResult =
  | {
      success: true;
      status: 200;
      data: any;
      message?: string;
    }
  | {
      success: false;
      status: number;
      message: string;
    };