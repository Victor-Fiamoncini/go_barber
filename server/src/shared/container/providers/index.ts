import { container } from 'tsyringe'
import mailConfig from '@config/mail'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import DiskStorageProvider from '@shared/container/providers/StorageProvider/implementations/DiskStorageProvider'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'
import MailtrapMailProvider from '@shared/container/providers/MailProvider/implementations/MailtrapMailProvider'

container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
	'MailTemplateProvider',
	HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
	'MailProvider',
	mailConfig.driver === 'ethereal'
		? container.resolve(EtherealMailProvider)
		: container.resolve(MailtrapMailProvider)
)
