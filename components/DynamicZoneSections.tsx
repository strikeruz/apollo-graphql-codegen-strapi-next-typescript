import { FC } from 'react'
import { PageDynamicZoneDynamicZone } from 'generated/global/types'
import Hero from '@components/dynamic-components/hero'

// Map Strapi sections to dynamicZone components
const dynamicComponentList = {
	ComponentSharedTitle: Hero,
}

type dynamicComponentsType = typeof dynamicComponentList

// Display a dynamicZone individually
const Zone = ({ data }: { data: PageDynamicZoneDynamicZone }) => {
	// Prepare the component
	const DynamicComponent: FC<{ data: any }> = dynamicComponentList[data.__typename as keyof dynamicComponentsType]

	if (!DynamicComponent) {
		return null
	}

	// Display the dynamicZone
	return <DynamicComponent data={data} />
}

// Display the list of dynamicZones
const DynamicZoneSections = ({ dynamicZones }: { dynamicZones: PageDynamicZoneDynamicZone[] }) => {
	return (
		<>
			{dynamicZones.map((component, index) => (
				<Zone data={component} key={`${component.__typename}_${index}`} />
			))}
		</>
	)
}

export default DynamicZoneSections
