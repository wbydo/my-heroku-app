import ExtensibleCustomError from 'extensible-custom-error';

class KakeybooError extends ExtensibleCustomError {}

// RecoverableError
//   リカバー可能なエラー
export class RecoverableError extends KakeybooError {}

// LogicalError
//   出たらバグ
export class LogicalError extends KakeybooError {}

// UniversalError
//   プログラムが停止すればよい場合に出すエラー
export class UniversalError extends KakeybooError {}
