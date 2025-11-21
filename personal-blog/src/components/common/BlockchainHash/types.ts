/**
 * BlockchainHash 组件类型定义
 *
 * 用于展示区块链交易 Hash，如同传统书画的印章
 */

export interface BlockchainHashProps {
  /** 完整的交易 Hash */
  hash: string;
  /** 显示模式：short 只显示首尾，full 显示完整 */
  mode?: 'short' | 'full';
  /** 是否可点击跳转到区块链浏览器 */
  clickable?: boolean;
  /** 显示标签 */
  showLabel?: boolean;
  /** 自定义 className */
  className?: string;
}
