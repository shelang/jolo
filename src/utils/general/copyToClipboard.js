import { message } from 'antd'

export const copyToClipboard = (response) => {
  navigator.clipboard.writeText(response.redirectTo)
  message.success('Copied to Your Clipboard')
}
