type SelectedBlockState = {
  selectedBlockId: string | null;
};

class BlockInstance {
  private state: SelectedBlockState = { selectedBlockId: null };

  unselectAllBlocks(): void {
    this.state.selectedBlockId = null;
  }

  setSelectedBlock(blockId: string | null): void {
    this.state.selectedBlockId = blockId;
  }

  getSelectedBlock(): string | null {
    return this.state.selectedBlockId;
  }
}

export const blockInstance = new BlockInstance();
