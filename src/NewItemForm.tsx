import { FC, useState } from "react"

type NewItemFormProps = {
	onAdd( text: string ): void
}

const NewItemForm: FC<NewItemFormProps> = ({ onAdd }) => {
// const NewItemForm = ({ onAdd }: NewItemFormProps ) => {
	const [ text, setText ] = useState('')

	return (
		<>
			<input
				value={text}
				onChange={(evt) => setText(evt.target.value)}
			/>

			<button onClick={() => onAdd(text)} > Create </button>

		</>
	)
}
export default NewItemForm
