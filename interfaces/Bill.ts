interface Bill {
  actionDate: string;
  actionDesc: string;
  bill: {
    congress: number;
    number: string;
    originChamber: string;
    originChamberCode: string;
    title: string;
    type: string;
    updateDateIncludingText: string;
    url: string;
  };
  currentChamber: string;
  currentChamberCode: string;
  lastSummaryUpdateDate: string;
  text: string;
  updateDate: string;
  versionCode: string;
  party: string;
}

export default Bill;
